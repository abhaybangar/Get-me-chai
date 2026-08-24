const Username = async ({ params }) => {
  const { username } = await params;

  return (
    <div className="min-h-screen">

      {/* Cover */}
      <div className="relative w-full">

        <img
          className="object-cover w-full h-[350px]"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/20.gif?token-hash=73PrwlPNIGDCHsplj7xxSj2evDXadHP_utXkWveuQGY%3D&token-time=1788480000"
          alt="Cover"
        />

        {/* Profile */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <img
            className="w-[120] h-[120] rounded-full object-cover border-4 border-white shadow-lg"
            src="https://static.vecteezy.com/system/resources/thumbnails/074/065/378/small/a-cute-fluffy-tabby-kitten-with-big-eyes-reaches-out-with-its-pink-paw-pads-photo.jpg"
            alt="Profile"
          />
        </div>

      </div>

      {/* Content */}
      <div className="mt-16 text-center text-white">

        <div className="font-bold text-2xl">
          {username}
        </div>

        <h1 className="text-xl mt-2 text-slate-400">
          Create Animated Arts
        </h1>

        <div className="mt-2 text-slate-400">
          26,738 members · 113 posts · $17,050/release
        </div>

      </div>

    </div>
  );
};

export default Username;