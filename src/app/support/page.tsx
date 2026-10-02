import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";
import {
  IconHeadset,
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconFacebook,
  IconTwitter,
  IconInstagram,
  IconLinkedin,
  IconQuestionMarkCircle,
  IconPaperAirplane,
} from "@/src/components/auth/icons";

export default function Support() {
  return (
    <AuthLayout>
      {/* Green banner with page title */}
      <div className="bg-gradient-to-r from-[#00c950] to-[#05df72] px-[120px] py-10">
        <div className="pb-4 text-sm text-white/90">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / <span className="text-white">Contact Us</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <IconHeadset className="h-7 w-7 text-white" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-white">Contact Us</h1>
            <p className="text-sm text-white/90">We&apos;d love to hear from you. Get in touch with our team.</p>
          </div>
        </div>
      </div>

      {/* Contact info + form */}
      <div className="flex gap-6 px-[120px] py-10">
        {/* Left column: contact info cards */}
        <div className="flex w-[360px] shrink-0 flex-col gap-6">
          <div className="flex items-start gap-4 rounded-xl border border-[#f3f4f6] bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconPhone className="h-5 w-5 text-[#00a63e]" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#101828]">Phone</h3>
              <p className="text-sm text-[#6a7282]">Mon-Fri from 8am to 6pm</p>
              <a href="tel:+18001234567" className="text-sm font-semibold text-[#00a63e]">
                +1 (800) 123-4567
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-[#f3f4f6] bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconMail className="h-5 w-5 text-[#00a63e]" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#101828]">Email</h3>
              <p className="text-sm text-[#6a7282]">We&apos;ll respond within 24 hours</p>
              <a href="mailto:support@freshcart.com" className="text-sm font-semibold text-[#00a63e]">
                support@freshcart.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-[#f3f4f6] bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconMapPin className="h-5 w-5 text-[#00a63e]" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#101828]">Office</h3>
              <p className="text-sm text-[#6a7282]">123 Commerce Street</p>
              <p className="text-sm text-[#6a7282]">New York, NY 10001</p>
              <p className="text-sm text-[#6a7282]">United States</p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-[#f3f4f6] bg-white p-5 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconClock className="h-5 w-5 text-[#00a63e]" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#101828]">Business Hours</h3>
              <p className="text-sm text-[#6a7282]">Monday - Friday: 8am - 6pm</p>
              <p className="text-sm text-[#6a7282]">Saturday: 9am - 4pm</p>
              <p className="text-sm text-[#6a7282]">Sunday: Closed</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#f3f4f6] bg-white p-5 shadow-sm">
            <h3 className="text-base font-semibold text-[#101828]">Follow Us</h3>
            <div className="mt-4 flex items-center gap-3">
              {/* TODO: link to the real social profiles */}
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] hover:bg-green-400 hover:text-amber-50 text-[#4a5565]">
                <IconFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] hover:bg-green-400 hover:text-amber-50 text-[#4a5565]">
                <IconTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] hover:bg-green-400 hover:text-amber-50 text-[#4a5565]">
                <IconInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] hover:bg-green-400 hover:text-amber-50 text-[#4a5565]">
                <IconLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Right column: contact form */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="rounded-2xl border border-[#f3f4f6] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
                <IconHeadset className="h-5 w-5 text-[#00a63e]" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#101828]">Send us a Message</h2>
                <p className="text-sm text-[#6a7282]">Fill out the form and we&apos;ll get back to you</p>
              </div>
            </div>

            {/* TODO: wire up the contact form submission */}
            <form className="mt-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#364153]">Full Name</label>
                  <input suppressHydrationWarning
                    type="text"
                    placeholder="John Doe"
                    className="rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm text-[#364153] placeholder:text-[#99a1af]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#364153]">Email Address</label>
                  <input suppressHydrationWarning
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm text-[#364153] placeholder:text-[#99a1af]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#364153]">Subject</label>
                <select suppressHydrationWarning className="rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm text-[#364153]">
                  <option>Select a subject</option>
                  <option>Order Inquiry</option>
                  <option>Shipping &amp; Delivery</option>
                  <option>Returns &amp; Refunds</option>
                  <option>Product Question</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#364153]">Message</label>
                <textarea suppressHydrationWarning
                  rows={5}
                  placeholder="How can we help you?"
                  className="resize-none rounded-lg border border-[#e5e7eb] px-4 py-2.5 text-sm text-[#364153] placeholder:text-[#99a1af]"
                />
              </div>

              <button suppressHydrationWarning
                type="submit"
                className="flex w-fit items-center gap-2 rounded-lg bg-[#16a34a] px-6 py-3 text-sm font-semibold text-white"
              >
                <IconPaperAirplane className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          <div className="flex items-start gap-4 rounded-2xl bg-[#f0fdf4] p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
              <IconQuestionMarkCircle className="h-5 w-5 text-[#00a63e]" />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#101828]">Looking for quick answers?</h3>
              <p className="mt-1 text-sm text-[#6a7282]">
                Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
              </p>
              {/* TODO: link to the real Help Center page */}
              <a href="#" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#00a63e]">
                Visit Help Center →
              </a>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
