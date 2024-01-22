import { FC } from "react";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-sm font-medium text-muted-foreground">{description}</p>
    </div>
  );
};
