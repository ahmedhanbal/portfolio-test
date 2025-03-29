import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = [
      {
        id: 1,
        title: "BitTorrent Client",
        description: "A BitTorrent CLI client implemented in C++, featuring peer-to-peer file sharing.",
        technologies: ["C++", "Networking", "BitTorrent"],
        link: "https://github.com/ahmedhanbal/bittorrent-client-cpp",
        github: "https://github.com/ahmedhanbal/bittorrent-client-cpp",
      },
      {
        id: 2,
        title: "Tetris",
        description: "A modern implementation of the classic Tetris game using C++ and SFML.",
        technologies: ["C++", "SFML", "Game Dev"],
        link: "https://github.com/ahmedhanbal/TetrisPF",
        github: "https://github.com/ahmedhanbal/TetrisPF",
      },
      {
        id: 3,
        title: "Space Shooter",
        description: "A retro-style space shooter game built with C++ and SFML, incorporating object-oriented design patterns.",
        technologies: ["C++", "SFML", "OOP"],
        link: "https://github.com/ahmedhanbal/SpaceshooterOOP",
        github: "https://github.com/ahmedhanbal/SpaceshooterOOP",
      },
      {
        id: 4,
        title: "Labyrinth Explorer",
        description: "A maze escape game leveraging DSA for pathfinding and procedural generation.",
        technologies: ["C++", "Algorithms", "Game Dev"],
        link: "https://github.com/ahmedhanbal/TetrisPF",
        github: "https://github.com/ahmedhanbal/TetrisPF",
      },
      {
        id: 5,
        title: "Traffic Simulation",
        description: "A comprehensive traffic at intersection simulator using OS concepts to model and optimize vehicle flow patterns.",
        technologies: ["C++", "Operating Systems", "Simulation"],
        link: "https://github.com/ahmedhanbal/TrafficSimulationOS",
        github: "https://github.com/ahmedhanbal/TrafficSimulationOS",
      },
      {
        id: 6,
        title: "Bitmap Encoder",
        description: "A simple bitmap generator I made to study file handling and files.",
        technologies: ["C++", "File Handling", "Graphics"],
        link: "https://github.com/ahmedhanbal/BitmapEncoder",
        github: "https://github.com/ahmedhanbal/BitmapEncoder",
      }
    ];
    
    return NextResponse.json({ posts: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 