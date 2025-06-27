
import MainLayout from "@/components/layout/MainLayout";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactChannels from "@/components/contact/ContactChannels";
import ContactForm from "@/components/contact/ContactForm";
import ContactCta from "@/components/contact/ContactCta";

const Contact = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <ContactHeader />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ContactChannels />
          <ContactForm />
        </div>

        <ContactCta />
      </div>
    </MainLayout>
  );
};

export default Contact;
