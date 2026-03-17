import { POST } from '../../../../app/api/chat/route';

jest.mock('../../../../lib/AIapis', () => ({
  askFlightAdvisor: jest.fn(),
}));

const { askFlightAdvisor } = require('../../../../lib/AIapis');

// The route handler only calls req.json(), so a plain mock is sufficient.
// jsdom does not provide the Fetch API Request constructor.
function makeRequest(body) {
  return { json: async () => body };
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when message is missing', async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('message is required');
  });

  it('returns 400 when message is whitespace only', async () => {
    const res = await POST(makeRequest({ message: '   ' }));
    expect(res.status).toBe(400);
  });

  it('returns 200 with reply on valid message', async () => {
    askFlightAdvisor.mockResolvedValue('Book 6 weeks out.');

    const res = await POST(makeRequest({ message: 'NYC to London in April' }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.reply).toBe('Book 6 weeks out.');
    expect(askFlightAdvisor).toHaveBeenCalledWith('NYC to London in April');
  });

  it('returns 500 when askFlightAdvisor throws', async () => {
    askFlightAdvisor.mockRejectedValue(new Error('API unavailable'));

    const res = await POST(makeRequest({ message: 'test' }));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe('AI provider error');
  });
});
