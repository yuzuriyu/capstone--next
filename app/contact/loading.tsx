import { ClipLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-full w-full bg-white">
      <ClipLoader className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
    </div>
  );
}
