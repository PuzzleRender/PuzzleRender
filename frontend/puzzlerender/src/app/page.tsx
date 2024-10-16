import Link from "next/link"

const Landing = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Link href={"/dashboard"}>
        <div>Go home</div>
      </Link>
    </div>
  )
}

export default Landing
