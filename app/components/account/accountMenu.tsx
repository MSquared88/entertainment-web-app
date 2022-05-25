import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";

import { Form } from "@remix-run/react";

export default function AccountMenu() {
  return (
    <div className=" text-left">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <motion.button type="submit" whileHover={{ scale: 1.1 }}>
              {" "}
              <img
                src="../assets/image-avatar.png"
                alt=""
                className="h-[40px] w-[40px]"
              />
            </motion.button>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 origin-top-right divide-y divide-gray-100 rounded-md bg-blue-grayish shadow-lg ring-1 focus:outline-none">
            <div className=" px-1 py-1">
              <Menu.Item>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
