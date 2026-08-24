const Username = async ({ params }) => {
  const { username } = await params;

  return (
    <div className="min-h-screen text-white">

      {/* Cover */}
      <div className="relative w-full">

        <img
          className="object-cover w-full h-[350px]"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/20.gif?token-hash=73PrwlPNIGDCHsplj7xxSj2evDXadHP_utXkWveuQGY%3D&token-time=1788480000"
          alt="Cover"
        />

        {/* Profile */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
          <img
            className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-xl"
            src="https://static.vecteezy.com/system/resources/thumbnails/074/065/378/small/a-cute-fluffy-tabby-kitten-with-big-eyes-reaches-out-with-its-pink-paw-pads-photo.jpg"
            alt="Profile"
          />
        </div>

      </div>


      {/* Creator Info */}
      <div className="mt-20 text-center px-4">

        <div className="font-bold text-3xl">
          {username}
        </div>

        <h1 className="text-xl mt-2 text-slate-400">
          Create Animated Arts
        </h1>

        <div className="mt-3 text-slate-400 text-sm">
          26,738 members · 113 posts · $17,050/release
        </div>

      </div>


      {/* Main Section */}
      <div className="max-w-6xl mx-auto px-4 mt-12 pb-16">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          {/* ========================= */}
          {/* Recent Supporters - LEFT */}
          {/* ========================= */}

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Recent Supporters
            </h2>

            <div className="bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden shadow-lg">

              <ul className="divide-y divide-slate-700">

                <li className="px-5 py-4 hover:bg-slate-800 transition-colors duration-100 flex items-center gap-4">

                  <img
                    src="/avatar.gif"
                    alt="Shubham"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                  />

                  <div>
                    <div className="font-medium">
                      Shubham
                    </div>

                    <div className="text-sm text-slate-400">
                      Donated $30 with a message
                    </div>
                  </div>

                </li>

                <li className="px-5 py-4 hover:bg-slate-800 transition-colors duration-100 flex items-center gap-4">

                  <img
                    src="/avatar.gif"
                    alt="Shubham"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                  />

                  <div>
                    <div className="font-medium">
                      Shubham
                    </div>

                    <div className="text-sm text-slate-400">
                      Donated $30 with a message
                    </div>
                  </div>

                </li>


                <li className="px-5 py-4 hover:bg-slate-800 transition-colors duration-100 flex items-center gap-4">

                  <img
                    src="/avatar.gif"
                    alt="Shubham"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                  />

                  <div>
                    <div className="font-medium">
                      Shubham
                    </div>

                    <div className="text-sm text-slate-400">
                      Donated $30 with a message
                    </div>
                  </div>

                </li>

                <li className="px-5 py-4 hover:bg-slate-800 transition-colors duration-100 flex items-center gap-4">

                  <img
                    src="/avatar.gif"
                    alt="Shubham"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                  />

                  <div>
                    <div className="font-medium">
                      Shubham
                    </div>

                    <div className="text-sm text-slate-400">
                      Donated $30 with a message
                    </div>
                  </div>

                </li>

                <li className="px-5 py-4 hover:bg-slate-800 transition-colors duration-100 flex items-center gap-4">

                  <img
                    src="/avatar.gif"
                    alt="Shubham"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
                  />

                  <div>
                    <div className="font-medium">
                      Shubham
                    </div>

                    <div className="text-sm text-slate-400">
                      Donated $30 with a message
                    </div>
                  </div>

                </li>

              </ul>

            </div>

          </div>


          {/* ========================= */}
          {/* Payment Section - RIGHT */}
          {/* ========================= */}

          <div>

            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 shadow-lg">

              <h2 className="text-2xl font-bold text-center">
                Support {username}
              </h2>

              <p className="text-slate-400 text-center mt-2">
                Choose an amount or enter your own amount
              </p>


              {/* Preset Amounts */}
              <div className="grid grid-cols-2 gap-3 mt-6">

                <button
                  type="button"
                  className="py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                >
                  ₹50
                </button>

                <button
                  type="button"
                  className="py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                >
                  ₹100
                </button>

                <button
                  type="button"
                  className="py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                >
                  ₹500
                </button>

                <button
                  type="button"
                  className="py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
                >
                  ₹1000
                </button>

              </div>


              {/* Custom Amount */}
              <div className="mt-6">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Or enter your own amount
                </label>

                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">

                  <span className="px-4 text-slate-400">
                    ₹
                  </span>

                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full bg-transparent px-2 py-3 outline-none text-white placeholder:text-slate-500"
                  />

                </div>

              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500 "
                />
              </div>

              {/* Message */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>

                <textarea
                  rows="3"
                  placeholder="Write a message..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white placeholder:text-slate-500 resize-none"
                />

              </div>


              {/* Pay Button */}
              <button
                type="button"
                className="w-full mt-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-3 transition"
              >
                Pay Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Username;