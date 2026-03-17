/* Uses jest.resetModules() + jest.doMock() to re-load AIapis with a fresh
   PROVIDER constant for each test, since it is captured at module init. */

describe('askFlightAdvisor', () => {
  const savedEnv = { ...process.env };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    process.env = { ...savedEnv };
  });

  function setupMocks({ anthropicCreate, openaiCreate, geminiGenerate } = {}) {
    jest.doMock('@anthropic-ai/sdk', () => ({
      Anthropic: jest.fn().mockImplementation(() => ({
        messages: { create: anthropicCreate ?? jest.fn() },
      })),
    }));
    jest.doMock('openai', () => ({
      OpenAI: jest.fn().mockImplementation(() => ({
        chat: { completions: { create: openaiCreate ?? jest.fn() } },
      })),
    }));
    jest.doMock('@google/genai', () => ({
      GoogleGenAI: jest.fn().mockImplementation(() => ({
        models: { generateContent: geminiGenerate ?? jest.fn() },
      })),
    }));
    return require('../../lib/AIapis');
  }

  it('defaults to anthropic when AI_PROVIDER is unset', async () => {
    delete process.env.AI_PROVIDER;
    const mockCreate = jest.fn().mockResolvedValue({
      content: [{ text: 'anthropic reply' }],
    });
    const { askFlightAdvisor } = setupMocks({ anthropicCreate: mockCreate });

    const result = await askFlightAdvisor('fly me to the moon');

    expect(result).toBe('anthropic reply');
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'claude-sonnet-4-6',
        messages: [{ role: 'user', content: 'fly me to the moon' }],
      })
    );
  });

  it('dispatches to openai', async () => {
    process.env.AI_PROVIDER = 'openai';
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [{ message: { content: 'openai reply' } }],
    });
    const { askFlightAdvisor } = setupMocks({ openaiCreate: mockCreate });

    const result = await askFlightAdvisor('test');

    expect(result).toBe('openai reply');
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'gpt-4o' })
    );
  });

  it('dispatches to deepseek', async () => {
    process.env.AI_PROVIDER = 'deepseek';
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [{ message: { content: 'deepseek reply' } }],
    });
    const { askFlightAdvisor } = setupMocks({ openaiCreate: mockCreate });

    const result = await askFlightAdvisor('test');

    expect(result).toBe('deepseek reply');
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'deepseek-chat' })
    );
  });

  it('dispatches to gemini', async () => {
    process.env.AI_PROVIDER = 'gemini';
    const mockGenerate = jest.fn().mockResolvedValue({ text: 'gemini reply' });
    const { askFlightAdvisor } = setupMocks({ geminiGenerate: mockGenerate });

    const result = await askFlightAdvisor('test');

    expect(result).toBe('gemini reply');
    expect(mockGenerate).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'gemini-2.0-flash' })
    );
  });

  it('dispatches to ollama using OLLAMA_MODEL env var', async () => {
    process.env.AI_PROVIDER = 'ollama';
    process.env.OLLAMA_MODEL = 'mistral';
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [{ message: { content: 'ollama reply' } }],
    });
    const { askFlightAdvisor } = setupMocks({ openaiCreate: mockCreate });

    const result = await askFlightAdvisor('test');

    expect(result).toBe('ollama reply');
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'mistral' })
    );
  });

  it('falls back to llama3.3 when OLLAMA_MODEL is unset', async () => {
    process.env.AI_PROVIDER = 'ollama';
    delete process.env.OLLAMA_MODEL;
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [{ message: { content: 'ollama reply' } }],
    });
    const { askFlightAdvisor } = setupMocks({ openaiCreate: mockCreate });

    await askFlightAdvisor('test');

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'llama3.3' })
    );
  });

  it('throws for an unknown provider', async () => {
    process.env.AI_PROVIDER = 'hal9000';
    const { askFlightAdvisor } = setupMocks();

    await expect(askFlightAdvisor('test')).rejects.toThrow(
      'Unknown AI_PROVIDER: "hal9000"'
    );
  });
});
