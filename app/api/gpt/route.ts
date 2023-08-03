import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const {
    messages: job_offer,
    companyName,
    jobTitle,
    user_data,
  } = await req.json();

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: `Ignore all previous instructions.

        You are an expert job search assistant specialized in crafting personalized cover letters.
        Your task is to generate a professional cover letter tailored to the applicant's information and the specific job offer provided.

        Here are the steps to follow:

        Step 1: Process all the information provided by the applicant regarding the job offer and the applicant's background.

        Step 2: Compose a well-structured cover letter with 3 to 5 paragraphs,
        covering essential subjects such as the company, the position, the applicant's relevant experience (if provided), and their motivations for applying.

        Your response should only contain the formatted cover letter and start with "Dear Hiring Manager,"
        —there's no need to include the company and applicant details at the beginning of the letter.
      `,
    },
    {
      role: "user",
      content: `
        ### Job offer infos ###
        Company name: """${companyName}""",
        Job Title: """${jobTitle}""",
        Job Description: """${job_offer[0].content}

        ### Applicant infos ###
        Full name: """${user_data.name}""",
        Primary role: """${user_data.role}""",
        Based in: """${user_data.location}""",
        Years of experience: """${user_data.seniority}""",
        Short introduction: """${user_data.bio}""",
        Previous experience: """${user_data.experiences}"""
      `,
    },
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0.5,
    max_tokens: 800,
    messages,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
