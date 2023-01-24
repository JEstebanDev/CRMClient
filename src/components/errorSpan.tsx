type Props = {
  name: String | undefined;
};
export default function ErrorSpan({ name }: Props) {
  return (
    <div className="bg-red-100 my-1  border-l-4 border-red-500 text-red-700 p-1">
      <p className="font-bold">Error</p>
      <p>{name}</p>
    </div>
  );
}
