export default function Image({
  src,
  ...props
}: {
  src?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={src} {...props} />;
}
