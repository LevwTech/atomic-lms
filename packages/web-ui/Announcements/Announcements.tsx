import * as React from "react";
import styles from "./Announcements.module.css";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../Shadcn/Drawer";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export default function Announcements() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <div className={`h-[100%]  py-[4%] flex flex-col`}>
        <div
          className={`${styles.header} h-[8vh]  bg-[var(--Primary)] mx-auto w-[90%] mb-[1.5vh] rounded`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={29}
            height={28}
            fill="none"
            className={styles.AnnouncementsIcon}
          >
            <path d="M23.888 14.53c-.033.446-.037.84-.097 1.226a3.476 3.476 0 0 1-1.145 2.21c-.426.365-.96.582-1.52.62a3.562 3.562 0 0 1-1.607-.257 5.185 5.185 0 0 0-1.846-.337c-.82-.011-1.642-.025-2.461 0-1.03.019-2.057.118-3.072.297-.331.063-.343.08-.274.419.317 1.574.628 3.148.956 4.72a3.318 3.318 0 0 1-3.414 4.017 3.325 3.325 0 0 1-3.046-2.667c-.14-.66-.265-1.323-.397-1.984-.122-.6-.245-1.198-.37-1.796-.062-.296-.098-.338-.403-.325a4.263 4.263 0 0 1-2.1-.402 4.252 4.252 0 0 1-1.087-6.93c.358-.324.756-.6 1.184-.825a17.194 17.194 0 0 0 3.005-2.089 15.765 15.765 0 0 0 1.928-2.05 34.343 34.343 0 0 0 2.516-3.775 6.73 6.73 0 0 0 .465-1.164c.146-.41.233-.845.408-1.242A2.871 2.871 0 0 1 14.833.618c.83.224 1.607.61 2.288 1.133a13.568 13.568 0 0 1 2.541 2.515 20.695 20.695 0 0 1 2.375 3.731 17.28 17.28 0 0 1 1.74 5.221c.057.457.075.91.111 1.312ZM4.946 18.54c.414.02.825-.08 1.184-.288a19.218 19.218 0 0 1 4.108-1.712 18.759 18.759 0 0 1 3.773-.62c.59-.043 1.184-.041 1.775-.066a.915.915 0 0 0 .22-.066.83.83 0 0 0-.098-.184 18.657 18.657 0 0 1-1.963-2.626 20.85 20.85 0 0 1-2.358-5.16 3.573 3.573 0 0 0-.152-.365 3.214 3.214 0 0 0-.26.3 20.941 20.941 0 0 1-3.643 4.312 18.937 18.937 0 0 1-2.35 1.74c-.525.329-1.072.625-1.58.978a1.913 1.913 0 0 0-.81 1.686 2.064 2.064 0 0 0 2.154 2.07Zm16.811-4.008c-.05-.409-.087-.909-.173-1.401a15.152 15.152 0 0 0-1.504-4.268 18.903 18.903 0 0 0-2.109-3.286 11.48 11.48 0 0 0-2.382-2.284 3.493 3.493 0 0 0-1.31-.599.745.745 0 0 0-.908.467c-.065.16-.11.327-.137.498a6.36 6.36 0 0 0 .099 2.256 16.205 16.205 0 0 0 1.75 4.783 15.508 15.508 0 0 0 3.55 4.61c.433.349.886.67 1.358.964.253.168.553.251.857.238a.592.592 0 0 0 .543-.31c.114-.196.201-.407.26-.626.066-.31.069-.627.106-1.042Zm-10.984 9.607c-.016-.095-.036-.23-.063-.364l-.785-3.916a38.69 38.69 0 0 0-.12-.59c-.073-.318-.09-.334-.378-.213-.52.218-1.036.45-1.548.688-.335.154-.332.164-.26.523.269 1.332.539 2.664.81 3.995.02.098.046.196.08.29a1.17 1.17 0 0 0 2.266-.413h-.002ZM21.716 3.604c.043-.169.093-.397.159-.624a4.64 4.64 0 0 1 .245-.721 1.007 1.007 0 0 1 1.245-.514 1.052 1.052 0 0 1 .714 1.247 8.868 8.868 0 0 1-.31 1.017 1.037 1.037 0 0 1-1.522.555 1.06 1.06 0 0 1-.531-.96ZM27.224 11.69a3.828 3.828 0 0 1-1.294-.404 1.041 1.041 0 0 1 .52-1.944c.5.04.989.17 1.443.382a.621.621 0 0 1 .173.132 1.027 1.027 0 0 1 .293 1.19 1.112 1.112 0 0 1-1.135.645ZM26.372 6.667a.965.965 0 0 1-.537.9 5.48 5.48 0 0 1-.89.477 1.056 1.056 0 0 1-.969-1.874c.29-.172.595-.318.89-.48a1.042 1.042 0 0 1 1.506.977Z" />
          </svg>
          <h1>ANNOUNCEMENTS</h1>
        </div>
        {Array.from({ length: 8 }).map((_, index) => (
          <DrawerTrigger
            asChild
            className="mb-[1.5vh] ml-[5%] cursor-pointer   hover:shadow-md  transition ease-in-out duration-500"
          >
            <div
              className={` h-[8vh] w-[90%]  rounded bg-[var(-- n
                +
              )] flex items-center`}
            >
              <div className="h-[78%] w-[2.2%] bg-[var(--Red)] rounded-[3px] ml-[0.8vw]"></div>

              <div className=" w-[85%] mx-auto">
                <div className=" w-full flex justify-between items-center">
                  <h1 className={styles.itemsTitle}>Deadline</h1>{" "}
                  <h3 className={styles.itemsTime}>11:59PM</h3>
                </div>
                <div className="flex">
                  <p className={styles.itemsDate}>10/15/2023</p>
                </div>
              </div>
            </div>
          </DrawerTrigger>
        ))}
        <DrawerContent className="border-white h-[44%]">
          <div className={` ${styles.drawerContent} flex `}>
            <div className={styles.drawerImg}></div>
            <DrawerHeader className=" h-[100%] w-[73%] flex flex-col ">
              <div className="flex justify-between">
                <DrawerTitle className="flex w-[17%]">
                  {" "}
                  <div className={styles.DrawerIcon}></div> Deadline Assignment
                </DrawerTitle>{" "}
                <div> 8 Mar 2024</div>
              </div>
              <DrawerDescription className="whitespace-break-spaces  text-lg font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                tenetur? Quos, rerum quidem. Explicabo, nesciunt. Similique
                facere nihil culpa laboriosam? Repellendus quam suscipit
                accusantium sunt aut, commodi atque consequuntur quasi. Lorem
                ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus tempora, qui corporis quidem placeat officiis
                laborum nemo, consequatur reiciendis cumque modi, quas
                recusandae minus itaque beatae est perferendis ipsa molestiae.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                reiciendis laudantium blanditiis consequatur, consequuntur esse,
                molestias quae impedit itaque, dolores vitae ipsa dolore porro
                tempore temporibus accusantium repellat officia quisquam?
              </DrawerDescription>
              <DrawerFooter className="pt[20%]">
                <button className="bg-[var(--Red)] text-white h-[2.5rem]  font-bold rounded">
                  Submit
                </button>
                <DrawerClose asChild>
                  <button className="h-[2.5rem] font-bold border-[2px] rounded">
                    Cancel
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerHeader>
          </div>
        </DrawerContent>
      </div>
    </Drawer>
  );
}
