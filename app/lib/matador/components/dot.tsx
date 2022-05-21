interface DotProps {
  color?: string;
}

export const Dot = ({ color }: DotProps) => {
  return (
    <span
      style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        display: "inline-block",
        backgroundColor: color ?? "green",
      }}
    ></span>
  );
};
