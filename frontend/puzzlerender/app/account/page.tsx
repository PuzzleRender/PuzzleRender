import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import puzzle from "@/public/intro.jpg";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center gap-10 text-lg">
      <div className="bg-white w-7/12 h-[50vh] flex items-center justify-center flex-col gap-8 rounded-lg">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" width={100} height={200} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h4>John Doe</h4>
        </div>
        <div>
          <div>
            <h5>First Name: John</h5>
          </div>
          <div>
            <h5>Last Name: Doe</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
