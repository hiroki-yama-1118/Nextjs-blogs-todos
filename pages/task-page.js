import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Task from "../components/Task";
import { getAllTasksData } from "../lib/tasks";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task`;

const TaskPage = ({ staticfilteredTasks }) => {
  //mutatteはデータのキャッシュを更新する
  //JavaScriptで実行される
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    fallbackData: staticfilteredTasks,
  });
  const filteredTasks = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  //データが更新された時に１度だけmutateを実行し、キャッシュを更新する
  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <Layout title="Task Page">
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => (
            <Task key={task.id} task={task} taskDeleted={mutate} />
          ))}
      </ul>
      <Link href="/main-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export default TaskPage;

export async function getStaticProps() {
  const staticfilteredTasks = await getAllTasksData();
  return {
    props: { staticfilteredTasks },
    revalidate: 3,
  };
}
