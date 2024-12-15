import {
  BetweenHorizonalEnd,
  BetweenVerticalEnd,
  LayoutGrid,
} from "lucide-react";

interface CallLayoutButtonsProps {
  layout: CallLayout;
  setLayout: (layout: CallLayout) => void;
}

const CallLayoutButtons = ({ layout, setLayout }: CallLayoutButtonsProps) => {
  return (
    <div className="mx-auto w-fit space-x-6">
      <button onClick={() => setLayout("speaker-vertcal")}>
        <BetweenVerticalEnd
          className={layout !== "speaker-vertcal" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("speaker-horizontal")}>
        <BetweenHorizonalEnd
          className={layout !== "speaker-horizontal" ? "text-gray-400" : ""}
        />
      </button>
      <button onClick={() => setLayout("grid")}>
        <LayoutGrid className={layout !== "grid" ? "text-gray-400" : ""} />
      </button>
    </div>
  );
};

export default CallLayoutButtons;
