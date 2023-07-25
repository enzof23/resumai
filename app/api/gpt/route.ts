import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
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
  const { messages: job_offer, companyName, jobTitle } = await req.json();

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are a job search assistant with a specialisation in writing cover letters and resumes. Your task is to assist the applicant in writing his cover letter for the job description he's giving you. Your answer will only contain the cover letter.",
    },
    {
      role: "user",
      content: job_offer[0].content,
    },
  ];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    temperature: 0.6,
    messages,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
  // return NextResponse.json("bonjour");
}
