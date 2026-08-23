import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center text-white h-[44vh]">
        <div className="font-bold text-4xl flex gap-2 justify-center items-center">Buy Me a Chai! <span><Image src="/tea.gif" width={88} height={88} alt="" priority unoptimized /></span></div>

        <p>
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start now!
        </p>

        <div>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Here
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
      </div>

      <div>
        <div>
          <div className="bg-white h-1 opacity-10"></div>

          <div className="text-white container mx-auto">
            <h2 className="text-2xl my-14 font-bold text-center">
              Your Fans Can Buy You a Chai
            </h2>

            <div className="flex gap-5 justify-around">

              <div className="item flex flex-col items-center space-y-3">
                <Image
                  className="bg-slate-400 rounded-full p-2"
                  src="/man.gif"
                  width={88}
                  height={88}
                  alt=""
                  unoptimized
                />
                <p className="font-bold">Your fans want to help</p>
                <p className="text-center"> Your Fans are Available for you</p>
              </div>

              <div className="item flex flex-col items-center space-y-3">
                <Image
                  className="bg-slate-400 rounded-full p-2"
                  src="/coin.gif"
                  width={88}
                  height={88}
                  alt=""
                  unoptimized
                />
                <p className="font-bold">Your fans want to help</p>
                <p className="text-center"> Your Fans are Available for you</p>
              </div>

              <div className="item flex flex-col items-center space-y-3 justify-center ">
                <Image
                  className="bg-slate-400 rounded-full p-2"
                  src="/group.gif"
                  width={88}
                  height={88}
                  alt=""
                  unoptimized
                />
                <p className="font-bold">Your fans want to help</p>
                <p className="text-center"> Your Fans are Available for you</p>
              </div>

            </div>
          </div>
        </div>
        <div className="bg-white h-1 opacity-10 my-20"></div>
        <div className="text-white container mx-auto my-10">
          <h2 className="text-2xl my-14 font-bold text-center">
            Your Fans Can Buy You a Chai
          </h2>

          <div className="flex gap-5 justify-around">

            <div className="item flex flex-col items-center space-y-3">
              <Image
                className="bg-slate-400 rounded-full p-2"
                src="/man.gif"
                width={88}
                height={88}
                alt=""
                unoptimized
              />
              <p className="font-bold">Your fans want to help</p>
              <p className="text-center"> Your Fans are Available for you</p>
            </div>

            <div className="item flex flex-col items-center space-y-3">
              <Image
                className="bg-slate-400 rounded-full p-2"
                src="/coin.gif"
                width={88}
                height={88}
                alt=""
                unoptimized
              />
              <p className="font-bold">Your fans want to help</p>
              <p className="text-center"> Your Fans are Available for you</p>
            </div>

            <div className="item flex flex-col items-center space-y-3 justify-center ">
              <Image
                className="bg-slate-400 rounded-full p-2"
                src="/group.gif"
                width={88}
                height={88}
                alt=""
                unoptimized
              />
              <p className="font-bold">Your fans want to help</p>
              <p className="text-center"> Your Fans are Available for you</p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
