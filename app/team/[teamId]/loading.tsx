import { Loader } from "components/Loader"

export default function Loading() {
  return (
    <section className="flex h-dvh w-full items-center justify-center">
      <Loader className="size-8" />
    </section>
  )
}
