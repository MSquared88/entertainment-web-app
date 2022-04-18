import { Form } from "@remix-run/react";

export function SearchForm({ placeHolder }: { placeHolder: string }) {
  return (
    <div className="mb-[1rem]">
      <Form>
        <button className="" type="submit">
          <img src="/assets/icon-search.svg" alt="" />
        </button>
        <input
          type="text"
          id="search-input"
          name="search"
          placeholder={placeHolder}
          className="w-[80%] border-b bg-blue-dark text-white placeholder:focus:text-blue-dark"
        />
      </Form>
    </div>
  );
}
