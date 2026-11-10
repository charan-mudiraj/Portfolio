import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export type IconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

// MUI icons size themselves with font-size via emotion styles, which can win
// over Tailwind's h-/w- classes, so size a wrapper and fill it instead.
export function WhatsAppGlyph({ className, ...rest }: IconProps) {
  return (
    <span className={`inline-flex ${className ?? ""}`} {...rest}>
      <WhatsAppIcon style={{ width: "100%", height: "100%" }} />
    </span>
  );
}
