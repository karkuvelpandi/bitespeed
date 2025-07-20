import {
  NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import Image from "next/image";

const TextNode = ({ data, id, ...props }: NodeProps) => {
  return (
    <div className={`shadow-md rounded-lg bg-white border-1 border-blue-100 w-64 overflow-hidden ${props.selected ? '!border-[#00d1ee]' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="font-bold bg-[#00d1ee] flex justify-between px-2 py-1">
        <div className="flex items-center space-x-2">
          <BiMessageRoundedDetail /> <span>Send Message</span>
        </div>
        <Image src="WhatsApp.svg" alt="WhatsApp" width={20} height={20} />
      </div>
      <p className="px-2 py-1">{`${data?.text}` || "No text"}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TextNode;
