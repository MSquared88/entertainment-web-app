import { motion } from "framer-motion";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function PlayIcon() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <motion.button
        type="button"
        onClick={openModal}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.05 }}
        tabIndex={1}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto hidden h-12 w-32  content-between items-center rounded-full bg-white bg-opacity-30 px-2 group-hover:flex group-focus:flex"
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <title>Play</title>
          <desc>A play icon.</desc>
          <path
            d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
            fill="#FFF"
          />
        </svg>
        <h1 className="ml-4 text-xl font-medium text-white">Play</h1>
      </motion.button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-semi p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-center bg-blue-semi text-white">
                    <h1 className="text-3xl">
                      These are not actually videos. They are just here for
                      show.
                    </h1>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
