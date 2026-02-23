import { useState } from "react";

const GameTab = () => {
  const [activeTab, setActiveTab] = useState("requirements");
  const requirements = (
    <ul>
      <li>OS: Windows 10/11 (64-bit)</li>
      <li>Processor: Intel Core i5-8400 / AMD Ryzen 3 3300X</li>
      <li>Memory: 12 GB RAM</li>
      <li>
        Graphics: NVIDIA GeForce GTX 1060 (3GB) / AMD Radeon RX 580 (4GB) /
        Intel Arc A380 (6GB)
      </li>
      <li>DirectX: Version 12 (Feature level 12.0)</li>
      <li>
        Storage: 60 GB (Base game), 80 GB+ (with Shadow of the Erdtree DLC){" "}
      </li>
    </ul>
  );

  const gameDescription = (
    <p>
      Elden Ring is a critically acclaimed, dark fantasy action-RPG developed by
      FromSoftware, featuring a vast open world called the Lands Between,
      designed in collaboration with George R.R. Martin. Players, as
      "Tarnished," explore ruins and dungeons, fight formidable bosses to
      recover Great Runes, and aim to become the Elden Lord.
    </p>
  );

  return (
    <div className="container">
      <div className="header">
        <div onClick={() => setActiveTab("requirements")}>Requirements</div>
        <div onClick={() => setActiveTab("description")}>Game Description</div>
      </div>
      <div className="content">
        {activeTab === "requirements" ? requirements : gameDescription}
      </div>
    </div>
  );
};

export default GameTab;
