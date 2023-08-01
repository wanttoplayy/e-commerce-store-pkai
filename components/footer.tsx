import { Contact, Contact2Icon, ContactIcon, FacebookIcon, LucideContact, PhoneCallIcon } from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="flex justify-around py-10">
        <button className="flex gap-3">
          <FacebookIcon />
          ID LINE
        </button>
        <button className="flex gap-3">
          <PhoneCallIcon />
          0966896345
        </button>
      </div>
      <footer className="bg-white border-t">
        <div className="mx-auto py-10">
          <p className="text-center text-xs text-black">
            &copy; 2023 FakeStoreName, Inc. Allright reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
