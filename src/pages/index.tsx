import { LinkButton } from "@components/general/Button/LinkButton";
import HomeImg from "@assets/images/home-img.svg";

export default function Home() {
  return (
    <div class="flex flex-col items-center p-6">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl">柳比歇夫</h1>
      <p class="mb-6 text-lg font-normal sm:px-16 lg:text-xl xl:px-48">時間管理</p>
      <div class="w-80">
        <img src={HomeImg} />
      </div>
      <div class="mt-6 flex gap-6">
        <LinkButton href="/register">註冊</LinkButton>
        <LinkButton href="/login">登入</LinkButton>
      </div>
    </div>
  );
}
