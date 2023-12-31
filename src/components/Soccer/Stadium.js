import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Stadium = () => {
	const mesh = useRef();
	const { nodes, materials } = useGLTF("/models/stadium.glb");

	return (
		<group ref={mesh} rotation={[0, Math.PI / 2, 0]}>
			{/* <group>
				<mesh castShadow receiveShadow geometry={nodes.Circle000.geometry}>
					<meshStandardMaterial color="red" />
				</mesh>
				<mesh castShadow receiveShadow geometry={nodes.Circle000_1.geometry}>
					<meshStandardMaterial color="green" />
				</mesh>
			</group> */}
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Circle936.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Circle936_1.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube017.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube017_1.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube017_2.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube017_3.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube020.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube020_1.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube022.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube022_1.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube024.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube024_1.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube033.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube033_1.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.DIviders.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.End_Terraces.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.End_Terraces_Back.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.End_Terraces_Back001.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.End_Terraces_Seats.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Entrance_Steps001.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Entrances.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Entrances001.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Fence.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Fence001.geometry}
				material={materials["Grey"]}
			/>
			<mesh castShadow receiveShadow geometry={nodes.Field.geometry}>
				<meshStandardMaterial
					attach="material"
					color="brown"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			{/* <mesh castShadow receiveShadow geometry={nodes.Field000.geometry}>
				<meshStandardMaterial
					attach="material"
					color="brown"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Field002.geometry}>
				<meshStandardMaterial
					attach="material"
					color="brown"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh> */}
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Field003.geometry}
				material={materials["Grey"]}
			>
				<meshStandardMaterial
					attach="material"
					color="brown"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Field004.geometry}
				material={materials["Grey"]}
			>
				<meshStandardMaterial
					attach="material"
					color="brown"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Gates.geometry}
				material={materials["Green.000"]}
			>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Goal_Nets.geometry}
				scale={[0.1, 0.1, 0.1]}
			>
				<meshStandardMaterial attach="material" color="brown" />
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Goals.geometry}>
				<meshStandardMaterial attach="material" color="brown" />
			</mesh>
			{/* <mesh  castShadow receiveShadow geometry={nodes.Ground.geometry} material={materials["Grey"]} /> */}
			{/* <mesh  castShadow receiveShadow geometry={nodes.Ground001.geometry} material={materials["Grey"]} /> */}
			<mesh castShadow receiveShadow geometry={nodes.Ground_Level.geometry}>
				<meshStandardMaterial
					attach="material"
					color="brown"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Ground_Level001.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Horizontal_Beams.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Horizontal_Beams001.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Lower_Bowl.geometry}
				material={materials["Blue .001"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Lower_Level_Back.geometry}
				material={materials["Green.000"]}
			>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Lower_Level_Seats.geometry}
			>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Mid_Level.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Mid_Level_Back.geometry}
				material={materials["Grey"]}
			/>
			<mesh castShadow receiveShadow geometry={nodes.Mid_level_Seats.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Plane000.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Plane000_1.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Players_Entrance.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Players_Entrance001.geometry}
			>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Pressbox.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Rails.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Rails001.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Ramps.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Ramps001.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Roof_Beams.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Roof_Beams001.geometry}
				material={materials["Grey"]}
			>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			{/* <mesh castShadow receiveShadow geometry={nodes.Roof_Shade.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh> */}
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Roof_Shade001.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Stairs_Back.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Stands.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Steps.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Supports.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Supports001.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Top_Level_Back.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Top_Level_Seats.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Top_Tier.geometry}
				material={materials["Grey"]}
			/>
			<mesh castShadow receiveShadow geometry={nodes.Trusses.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Trusses001.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Upper_Ends_Back.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Upper_Ends_Seats.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Upper_Wall.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.Upper_Wall001.geometry}>
				<meshStandardMaterial
					attach="material"
					color="yellow"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.WIndow_Frames.geometry}>
				<meshStandardMaterial
					attach="material"
					color="blue"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>

			<mesh
				castShadow
				receiveShadow
				geometry={nodes.WIndow_Frames_SIdes.geometry}
			>
				<meshStandardMaterial
					attach="material"
					color="purple"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.WIndow_Frames_ends.geometry}
			>
				<meshStandardMaterial
					attach="material"
					color="purple"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.WIndows_Outer.geometry}>
				<meshStandardMaterial
					attach="material"
					color="gray"
					roughness={0.5}
					metalness={0.5}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Windows.geometry}
				material={materials["Grey"]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Windows_Inner.geometry}
				material={materials["Grey"]}
			/>
		</group>
	);
};
useGLTF.preload("/models/stadium.glb");
