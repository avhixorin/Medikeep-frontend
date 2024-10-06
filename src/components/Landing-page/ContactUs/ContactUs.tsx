import React from "react";
import { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";
// import Swal from "sweetalert2";
import DNAViewer from "./Canvas/DNAViewer";

const ContactUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  // const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   emailjs
  //     .send(
  //       "service_qy1d9d6",
  //       "template_p2xo9oe",
  //       {
  //         from_name: form.name,
  //         to_name: "avhixorin",
  //         from_email: form.email,
  //         to_email: "ay5497368@gmail.com",
  //         message: form.message,
  //       },
  //       "WXfxZnnOlNJxJqPdw"
  //     )
  //     .then(
  //       () => {
  //         setLoading(false);
  //         Swal.fire({
  //           text: "Thank you. I will get back to you as soon as possible.",
  //           icon: "success",
  //           background: "#1a1a1a",
  //           color: "#fff",
  //         });

  //         setForm({
  //           name: "",
  //           email: "",
  //           message: "",
  //         });
  //       },
  //       (error) => {
  //         setLoading(false);
  //         console.error(error);
  //         Swal.fire({
  //           text: "Ahh, something went wrong. Please try again.",
  //           icon: "error",
  //           background: "#1a1a1a",
  //           color: "#fff",
  //         });
  //       }
  //     );
  // };

  return (
    <div itemID="contact-section" className="mt-12 flex flex-col gap-10 overflow-hidden py-6 bg-blue-50" id="contact">
      <div className="dark:bg-gray-800 p-8 w-full flex">
        <div className="w-full bg-white lg:w-[40%] py-8 rounded-2xl shadow-lg flex flex-col items-center">
          <p className="text-[18px] text-gray-600 dark:text-gray-400 uppercase tracking-wider text-center">
            Get in touch with the Developer
          </p>
          <h3 className="text-gray-900 dark:text-white font-black text-center text-[40px] mb-8">
            Contact
          </h3>
          <form
            ref={formRef}
            // onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-3/4 items-center"
          >
            <label className="flex flex-col w-full">
              <span className="text-gray-700 dark:text-gray-200 font-medium mb-2">
                Your Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-gray-100 dark:bg-gray-700 py-3 px-4 placeholder:text-gray-400 text-gray-900 dark:text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col w-full">
              <span className="text-gray-700 dark:text-gray-200 font-medium mb-2">
                Your Email
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-gray-100 dark:bg-gray-700 py-3 px-4 placeholder:text-gray-400 text-gray-900 dark:text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col w-full">
              <span className="text-gray-700 dark:text-gray-200 font-medium mb-2">
                Your Message
              </span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                
                onChange={handleChange}
                placeholder="What would you like to say?"
                className="bg-gray-100 dark:bg-gray-700 py-3 px-4 placeholder:text-gray-400 text-gray-900 dark:text-white rounded-lg outline-none border-none font-medium resize-none"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 transition py-3 px-8 rounded-lg outline-none text-white font-bold shadow-md"
            >
              {/* {loading ? "Sending..." : "Send"} */}
              Send
            </button>
          </form>
        </div>
        <div className="w-[60%] hidden lg:block">
          <DNAViewer />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
