import { Track } from "./Track";

type PreviewArtProps = {
  eyebrow: string;
  result: string;
  index?: number;
  dark?: boolean;
  tone?: "sky" | "mist" | "deep";
};

export function PreviewArt({ eyebrow, result, index = 1, dark = false, tone }: PreviewArtProps) {
  const resolved = tone ?? (dark ? "deep" : index % 3 === 2 ? "mist" : "sky");
  return (
    <div className={`preview-art tone-${resolved}`}>
      <Track className="preview-track" />
      <span className="preview-hatch" aria-hidden />
      <div className="preview-top"><span>{String(index).padStart(2, "0")}</span></div>
      <div className="preview-glass"><small>{eyebrow}</small><strong>{result}</strong></div>
    </div>
  );
}
