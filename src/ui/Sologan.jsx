import { Wifi } from "lucide-react";


const Sologan = () => {
    return (
        <div className="flex items-center justify-between px-3 py-0">
            <div className="flex items-center gap-2">
                <Wifi
                    size={24}
                    className="transform -rotate-45 text-[#D9F266]"
                />
                <h2 className="text-lg font-bold">Elite UK</h2>
            </div>
        </div>
    )
}

export default Sologan;