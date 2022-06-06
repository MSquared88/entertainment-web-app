import { Form } from "@remix-run/react";

export function SearchForm({ placeHolder }: { placeHolder: string }) {
  return (
    <div>
      <Form className="mb-[1%] flex items-center justify-start" method="get">
        <button className="mr-4" type="submit">
          <img
            src="/assets/icon-search.svg"
            alt="search button"
            className="aspect-square w-[32px]"
          />
        </button>
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder={placeHolder}
          className="w-[90%] border-b-blue-grayish bg-blue-dark pb-2 text-white focus:border-b-[1px] focus:outline-0 placeholder:focus:text-blue-dark"
        />
      </Form>
    </div>
  );
}
