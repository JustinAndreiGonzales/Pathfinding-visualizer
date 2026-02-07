import { useState, type JSX } from "react";
import Button from "./simple/Button";
import { PlayIcon } from "../icons/PlayIcon";
import { EraserIcon } from "../icons/EraserIcon";
import { TrashcanIcon } from "../icons/TrashcanIcon";
import { ResetIcon } from "../icons/ResetIcon";
import { DiceIcon } from "../icons/DiceIcon";
import { LayersIcon } from "../icons/LayersIcon";
import { DropdownIcon } from "../icons/DropdownIcon";
import { useSettingsContext } from "../hooks/useSettingsContext";
import { useControlsContext } from "../hooks/useControlsContext";

// TODO: statistics data
const Sidebar = () => {
	return (
		<div className="overflow-y-auto border-r flex flex-col border-brdr-1 p-6 gap-6 no-scrollbar">
			{/* Algo Selection */}
			<SidebarGroup header="ALGORITHM">
				<AlgorithmControl />
			</SidebarGroup>
			{/* Controls */}
			<SidebarGroup header="CONTROLS">
				<Controls />
			</SidebarGroup>
			{/* Speed */}
			<SidebarGroup header="SPEED">
				<SpeedControl />
			</SidebarGroup>
			{/* Maze Patterns */}
			<SidebarGroup header="MAZE PATTERNS">
				<MazePatterns />
			</SidebarGroup>
			<SidebarGroup header="LEGEND">
				<Legend />
			</SidebarGroup>
			<SidebarGroup header="STATISTICS">
				<Statistics visitedNodes={0} pathLength={0} timeTaken={0} />
			</SidebarGroup>
		</div>
	);
};

type SidebarGroupProps = {
	children: JSX.Element;
	header: string;
};

const SidebarGroup = ({ children, header }: SidebarGroupProps) => {
	return (
		<div className="flex flex-col inter text-[14px] font-semibold gap-6">
			{header}
			{children}
		</div>
	);
};

// TODO: hover stuff
const AlgorithmControl = () => {
	const { algorithms, currAlgo, setCurrAlgo } = useSettingsContext();
	const [isDropDownShowing, setIsDropDownShowing] = useState(false);
	return (
		<div className="relative w-full cursor-pointer">
			<div onClick={() => setIsDropDownShowing((prev) => !prev)}>
				<div className="w-full font-medium text-[16px] rounded-lg p-4 inter text-secondary bg-white border border-brdr-2">
					{currAlgo}
				</div>
				<div className="absolute flex items-center inset-y-0 right-0 pr-3">
					<DropdownIcon className="w-4 h-4 text-gray-500" />
				</div>
			</div>
			{isDropDownShowing && (
				<div className="absolute flex flex-col top-[80%] p-4 pb-2 bg-white border border-t-0 border-brdr-2 rounded-b-lg w-full font-medium text-[16px] text-secondary">
					{algorithms
						.filter((algo) => algo !== currAlgo)
						.map((algo, _) => (
							<div
								className="cursor-pointer"
								key={algo}
								onClick={() => {
									setCurrAlgo(algo);
									setIsDropDownShowing(false);
								}}
							>
								{algo}
							</div>
						))}
				</div>
			)}
		</div>
	);
};

const Controls = () => {
	const {
		handleVisualize,
		handleClearPath,
		handleClearWalls,
		handleResetBoard,
	} = useControlsContext();
	return (
		<div className="flex flex-col gap-3 items-center justify-center">
			<Button
				type="primary"
				text="Visualize Algorithm"
				Icon={PlayIcon}
				onClick={handleVisualize}
			/>
			<Button
				type="secondary"
				text="Clear Path"
				Icon={EraserIcon}
				onClick={handleClearPath}
			/>
			<Button
				type="secondary"
				text="Clear Walls"
				Icon={TrashcanIcon}
				onClick={handleClearWalls}
			/>
			<Button
				type="secondary"
				text="Reset Board"
				Icon={ResetIcon}
				onClick={handleResetBoard}
			/>
		</div>
	);
};

const SpeedControl = () => {
	const { speed, setSpeed } = useControlsContext();
	return (
		<div className="flex flex-col gap-3 items-center justify-center w-full font-normal text-3">
			<input
				type="range"
				min={0}
				max={99}
				step={5}
				value={speed}
				onChange={(e) => setSpeed(Number(e.target.value))}
				className="slider"
			/>
			<div className="flex items-center justify-between w-full">
				<p>Slow</p>
				Fast
			</div>
		</div>
	);
};

const MazePatterns = () => {
	const { handleGenerateRandomMaze, handleRecursiveDivision } =
		useControlsContext();
	return (
		<div className="flex flex-col gap-3 items-center justify-center">
			<Button
				type="secondary"
				text="Generate Random Maze"
				Icon={DiceIcon}
				onClick={handleGenerateRandomMaze}
			/>
			<Button
				type="secondary"
				text="Recursive Division"
				Icon={LayersIcon}
				onClick={handleRecursiveDivision}
			/>
		</div>
	);
};

const Legend = () => {
	const legends = [
		{ color: "bg-start", text: "Start Node" },
		{ color: "bg-end", text: "End Node" },
		{ color: "bg-wall", text: "Wall Node" },
		{ color: "bg-visited", text: "Visited Node" },
		{ color: "bg-path", text: "Shortest Node" },
	];
	return (
		<div className="flex flex-col gap-3">
			{legends.map((node, index) => (
				<div
					key={index}
					className="flex gap-3 items-center inter font-normal text-[14px] text-secondary"
				>
					<div className={`w-6 h-6 rounded-sm ${node.color}`} />
					{node.text}
				</div>
			))}
		</div>
	);
};

type StatisticsProps = {
	visitedNodes: number;
	pathLength: number;
	timeTaken: number;
};

const Statistics = ({
	visitedNodes,
	pathLength,
	timeTaken,
}: StatisticsProps) => {
	const stats = [
		{ text: "Visited Nodes:", val: visitedNodes },
		{ text: "Path Length:", val: pathLength },
		{ text: "Time Taken:", val: timeTaken },
	];
	return (
		<div className="flex flex-col justify-center items-center gap-2 rounded-lg inter text-secondary text-[14px] p-4 bg-bg-3">
			{stats.map((stat, index) => (
				<div
					key={index}
					className="flex items-center w-full justify-between"
				>
					{stat.text}
					<span className="font-semibold text-black">
						{stat.val}
						{stat.text === "Time Taken:" ? "ms" : ""}
					</span>
				</div>
			))}
		</div>
	);
};

export default Sidebar;
