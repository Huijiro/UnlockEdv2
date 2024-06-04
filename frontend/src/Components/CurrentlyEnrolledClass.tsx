import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

export default function CurrentlyEnrolledClass({ course }: { course: any }) {
  console.log(course)
  return (
    <div
      className={`card bg-inner-background flex flex-row justify-between body-small py-3 px-6`}
    >
      <div className="flex flex-row">
        {course.alt_name !== "" && <p className="font-bold w-[100px]">{course.alt_name}</p>}
        <p>{course.name}</p>
      </div>
      <a href={course.external_url} target="_blank" className="flex gap-2">
        <span>{course.provider_platform_name}</span>
        <ArrowUpRightIcon className="w-4" />
      </a>
    </div>
  );
}
