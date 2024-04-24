import { ProfileSection, WorkExperienceSection } from "./components/sections";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-10 place-self-center border border-slate-50 rounded-sm p-4 mt-4 w-full max-w-5xl sm:p-6 sm:mt-0">
      <ProfileSection />

      <hr className="w-11/12 border-[1px] self-center border-slate-800" />

      <WorkExperienceSection />
    </div>
  );
}
