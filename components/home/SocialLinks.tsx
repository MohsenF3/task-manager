import Image from "next/image";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-10">
      {/* instagram */}
      <div className="tooltip-container">
        <div className="tooltip">
          <div className="profile">
            <div className="user">
              <div className="img">
                <Image
                  src="/me.jpg"
                  alt=""
                  fill
                  className="object-cover rounded-[15px] border-[#e6683c]"
                />
              </div>
              <div className="details">
                <div className="name">User</div>
                <div className="username">@_moh3en.fa</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text">
          <a className="icon" href="#">
            <div className="layer">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className="instagramSVG ">
                <Image
                  src="/instagram.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="svgIcon invert"
                />
              </span>
            </div>
            <div className="text">Instagram</div>
          </a>
        </div>
      </div>

      {/* github */}
      <div className="tooltip-container">
        <div className="tooltip">
          <div className="profile">
            <div className="user">
              <div className="img github">
                <Image
                  src="/me.jpg"
                  alt=""
                  fill
                  className="object-cover rounded-[15px] border-white"
                />
              </div>
              <div className="details">
                <div className="">User</div>
                <div className="username">@MohsenF3</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text ">
          <a className="icon" href="https://github.com/MohsenF3">
            <div className="layer github">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className="githubSVG">
                <Image
                  src="/github.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="svgIcon invert"
                />
              </span>
            </div>
            <div className="text">Github</div>
          </a>
        </div>
      </div>
    </div>
  );
}
