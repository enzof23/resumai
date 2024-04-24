import Link from "next/link";

interface Step {
  number: string;
  title: string;
}

interface Point {
  x: number;
  y: number;
}

const steps: Step[] = [
  {
    number: "1",
    title: "Find your dream job offer",
  },
  {
    number: "2",
    title: "Provide all the relevant information",
  },
  {
    number: "3",
    title: "Generate your cover letter in one click",
  },
  {
    number: "4",
    title: "You're ready to apply!",
  },
];

export default function Steps() {
  return (
    <div className="relative flex flex-col gap-6 mt-8 md:mt-0 lg:ml-4 lg:my-6">
      {steps.map((step) => {
        const { number, title } = step;

        return (
          <div
            key={title}
            className="grid grid-cols-[48px_1fr] items-center gap-3 z-10"
          >
            <ProgressionSquare number={number} />
            <p className="text-slate-100 font-medium">{title}</p>
          </div>
        );
      })}

      <Link
        href={"/"}
        className="z-10 border-2 border-slate-400/80 bg-gradient-to-br from-slate-900 to-slate-600 text-center rounded-lg py-4 font-medium tracking-wide md:self-center md:px-12 lg:px-16 lg:self-start lg:ml-24"
      >
        Get Started
      </Link>

      <svg className="absolute stroke-slate-600 top-12 h-[216px] md:h-[272px] lg:h-[320px] w-24">
        <Line start={{ x: 0, y: 0 }} end={{ x: 0, y: 270 }} />
        <Line start={{ x: -1, y: 270 }} end={{ x: 72, y: 270 }} />
      </svg>
    </div>
  );
}

function ProgressionSquare(props: { number: string }) {
  const { number } = props;

  return (
    <div className="z-10 grid place-items-center h-12 w-12 bg-gradient-to-tr from-slate-900 to-slate-600 rounded-xl">
      {number}
    </div>
  );
}

function Line(props: { start: Point; end: Point }) {
  const { start, end } = props;

  const startX = start.x + 24; // Adjust for centering the line
  const startY = start.y;
  const endX = end.x + 24;
  const endY = end.y;

  return <line x1={startX} y1={startY} x2={endX} y2={endY} strokeWidth="2" />;
}
