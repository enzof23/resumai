export default function CircularProgress({ filled }: { filled: number }) {
  const sqSize = 34;
  const strokeWidth = 4;
  const percentage = parseInt(((filled / 7) * 100).toFixed());

  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="fill-none stroke-slate-50"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <circle
        className="fill-none stroke-green-600"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        className="text-[10px] fill-slate-100 font-semibold tracking-tight"
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
      >
        {`${Math.round(percentage / 5) * 5}%`}
      </text>
    </svg>
  );
}
