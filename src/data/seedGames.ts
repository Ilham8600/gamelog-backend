export interface SeedGame {
  id: number;
  title: string;
  coverUrl: string;
  description: string;
  genres: string;
  platforms: string;
  developer: string;
  releaseYear: number;
  rating: number;
}

export const seedGames: SeedGame[] = [
  {
    id: 1,
    title: "Elden Ring",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Elden+Ring",
    description:
      "An action RPG developed by FromSoftware set in a vast open world called the Lands Between. Crafted in collaboration with George R. R. Martin, players explore dungeons, battle legendary bosses, and uncover the mystery of the shattered Elden Ring.",
    genres: "Action RPG, Open World",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One",
    developer: "FromSoftware",
    releaseYear: 2022,
    rating: 9.5,
  },
  {
    id: 2,
    title: "The Witcher 3: Wild Hunt",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Witcher+3",
    description:
      "An award-winning open-world RPG set on a dark fantasy continent. Play as Geralt of Rivia, a monster hunter searching for his adopted daughter while navigating political intrigue and supernatural threats.",
    genres: "Action RPG, Open World",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One, Nintendo Switch",
    developer: "CD Projekt Red",
    releaseYear: 2015,
    rating: 9.7,
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=RDR2",
    description:
      "An epic tale of life in America at the dawn of the modern age. Follow Arthur Morgan and the Van der Linde gang as they rob, fight, and steal their way across a vast and rugged heartland.",
    genres: "Action, Adventure, Open World",
    platforms: "PC, PlayStation 4, Xbox One",
    developer: "Rockstar Games",
    releaseYear: 2018,
    rating: 9.6,
  },
  {
    id: 4,
    title: "God of War Ragnarök",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=GoW+Ragnarok",
    description:
      "Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for Ragnarök, the prophesied end of the world.",
    genres: "Action, Adventure",
    platforms: "PlayStation 5, PlayStation 4, PC",
    developer: "Santa Monica Studio",
    releaseYear: 2022,
    rating: 9.4,
  },
  {
    id: 5,
    title: "Cyberpunk 2077",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Cyberpunk+2077",
    description:
      "An open-world action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour, and body modification. Play as V, a mercenary outlaw going after a one-of-a-kind implant.",
    genres: "Action RPG, Open World",
    platforms: "PC, PlayStation 5, Xbox Series X|S",
    developer: "CD Projekt Red",
    releaseYear: 2020,
    rating: 8.6,
  },
  {
    id: 6,
    title: "The Legend of Zelda: Tears of the Kingdom",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Zelda+TOTK",
    description:
      "An epic adventure across the land and skies of Hyrule. Utilize Link's new abilities like Ultrahand, Fuse, Ascend, and Recall to explore a world above and below.",
    genres: "Action, Adventure, Open World",
    platforms: "Nintendo Switch",
    developer: "Nintendo EPD",
    releaseYear: 2023,
    rating: 9.6,
  },
  {
    id: 7,
    title: "Baldur's Gate 3",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Baldurs+Gate+3",
    description:
      "A story-rich, party-based RPG set in the universe of Dungeons & Dragons. Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival.",
    genres: "RPG, Turn-Based Strategy",
    platforms: "PC, PlayStation 5, Xbox Series X|S, macOS",
    developer: "Larian Studios",
    releaseYear: 2023,
    rating: 9.7,
  },
  {
    id: 8,
    title: "Hades",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Hades",
    description:
      "A rogue-like dungeon crawler in which you defy the god of the dead as you hack and slash your way out of the Underworld of Greek myth. Combines fast-paced action with a rich, ever-unfolding story.",
    genres: "Roguelike, Action, Indie",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One, Nintendo Switch",
    developer: "Supergiant Games",
    releaseYear: 2020,
    rating: 9.3,
  },
  {
    id: 9,
    title: "Hollow Knight",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Hollow+Knight",
    description:
      "A challenging 2D action-adventure set in the vast, interconnected underground world of Hallownest. Explore twisting caverns, battle tainted creatures, and uncover an ancient kingdom's secrets.",
    genres: "Metroidvania, Action, Indie",
    platforms: "PC, PlayStation 4, Xbox One, Nintendo Switch",
    developer: "Team Cherry",
    releaseYear: 2017,
    rating: 9.1,
  },
  {
    id: 10,
    title: "Stardew Valley",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Stardew+Valley",
    description:
      "An open-ended country-life RPG where you inherit your grandfather's old farm plot. Learn to live off the land, raise animals, craft goods, mine for ores, and become part of the local community.",
    genres: "Simulation, RPG, Indie",
    platforms: "PC, PlayStation 4, Xbox One, Nintendo Switch, iOS, Android",
    developer: "ConcernedApe",
    releaseYear: 2016,
    rating: 9.0,
  },
  {
    id: 11,
    title: "Grand Theft Auto V",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=GTA+V",
    description:
      "An action-adventure game set in the sprawling city of Los Santos and its surroundings. Follow the intertwined stories of three distinct criminals as they commit daring heists across the city.",
    genres: "Action, Adventure, Open World",
    platforms: "PC, PlayStation 5, PlayStation 4, PlayStation 3, Xbox Series X|S, Xbox One, Xbox 360",
    developer: "Rockstar North",
    releaseYear: 2013,
    rating: 9.5,
  },
  {
    id: 12,
    title: "Minecraft",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Minecraft",
    description:
      "A sandbox game that allows players to build, explore, and survive in a blocky, procedurally generated 3D world. Create anything you can imagine or survive against creatures of the night.",
    genres: "Sandbox, Survival, Adventure",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One, Nintendo Switch, iOS, Android",
    developer: "Mojang Studios",
    releaseYear: 2011,
    rating: 9.2,
  },
  {
    id: 13,
    title: "The Last of Us Part II",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=TLOU+Part+II",
    description:
      "Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down. When a violent event disrupts their peace, Ellie embarks on a relentless journey seeking justice.",
    genres: "Action, Adventure, Survival Horror",
    platforms: "PlayStation 5, PlayStation 4, PC",
    developer: "Naughty Dog",
    releaseYear: 2020,
    rating: 9.1,
  },
  {
    id: 14,
    title: "Ghost of Tsushima",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Ghost+Tsushima",
    description:
      "In 1274, the Mongol empire invades the island of Tsushima. As one of the last surviving samurai, rise from the ashes to fight back using new methods that go against the samurai code of honor.",
    genres: "Action, Adventure, Open World",
    platforms: "PlayStation 5, PlayStation 4, PC",
    developer: "Sucker Punch Productions",
    releaseYear: 2020,
    rating: 9.3,
  },
  {
    id: 15,
    title: "Sekiro: Shadows Die Twice",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Sekiro",
    description:
      "An action-adventure game set in a reimagined late 1500s Sengoku Japan. Play as the one-armed wolf, a disgraced warrior who must rescue his lord and exact revenge on his enemies.",
    genres: "Action, Adventure",
    platforms: "PC, PlayStation 4, Xbox One",
    developer: "FromSoftware",
    releaseYear: 2019,
    rating: 9.2,
  },
  {
    id: 16,
    title: "Dark Souls III",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Dark+Souls+3",
    description:
      "As fires fade and the world falls into ruin, journey into a universe of fallen lords and fearsome creatures. Only embers remain, but there are always those who dare to brave the darkness.",
    genres: "Action RPG",
    platforms: "PC, PlayStation 4, Xbox One",
    developer: "FromSoftware",
    releaseYear: 2016,
    rating: 9.0,
  },
  {
    id: 17,
    title: "Persona 5 Royal",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Persona+5+Royal",
    description:
      "Don the mask of Joker and unite with the Phantom Thieves to stage grand heists, infiltrate palaces of corrupt adults, and make them change their ways. A JRPG blending social simulation with dungeon crawling.",
    genres: "JRPG, Turn-Based",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One, Nintendo Switch",
    developer: "Atlus",
    releaseYear: 2020,
    rating: 9.5,
  },
  {
    id: 18,
    title: "Final Fantasy VII Remake",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=FF7+Remake",
    description:
      "A reimagining of the iconic original game that redefined the RPG genre. The first entry in the multi-part remake project delivers a deeply immersive experience with a real-time action battle system.",
    genres: "Action RPG, JRPG",
    platforms: "PC, PlayStation 5, PlayStation 4",
    developer: "Square Enix",
    releaseYear: 2020,
    rating: 9.0,
  },
  {
    id: 19,
    title: "Horizon Forbidden West",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Horizon+FW",
    description:
      "Join Aloy as she braves the Forbidden West, a lethal frontier full of mysterious new threats. Explore distant lands, fight bigger and more awe-inspiring machines, and encounter new tribes.",
    genres: "Action RPG, Open World",
    platforms: "PlayStation 5, PlayStation 4, PC",
    developer: "Guerrilla Games",
    releaseYear: 2022,
    rating: 8.8,
  },
  {
    id: 20,
    title: "Marvel's Spider-Man 2",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Spider-Man+2",
    description:
      "Spider-Men Peter Parker and Miles Morales return for an exciting new adventure in the acclaimed Marvel's Spider-Man franchise. Swing, jump, and soar across Marvel's New York.",
    genres: "Action, Adventure, Open World",
    platforms: "PlayStation 5, PC",
    developer: "Insomniac Games",
    releaseYear: 2023,
    rating: 9.1,
  },
  {
    id: 21,
    title: "Resident Evil 4 Remake",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=RE4+Remake",
    description:
      "A reimagining of the 2005 original, following Leon S. Kennedy as he's sent to rescue the U.S. President's kidnapped daughter in rural Spain, where he encounters a cult and sinister horrors.",
    genres: "Survival Horror, Action",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S",
    developer: "Capcom",
    releaseYear: 2023,
    rating: 9.3,
  },
  {
    id: 22,
    title: "Disco Elysium",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Disco+Elysium",
    description:
      "A groundbreaking open-world role playing game where you are a detective with a unique skill system. Interrogate unforgettable characters, crack murders, or take bribes. The city of Revachol awaits.",
    genres: "RPG, Adventure, Indie",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One, Nintendo Switch",
    developer: "ZA/UM",
    releaseYear: 2019,
    rating: 9.4,
  },
  {
    id: 23,
    title: "Celeste",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Celeste",
    description:
      "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain. A tight, challenging platformer with a heartfelt story about overcoming personal struggles.",
    genres: "Platformer, Indie",
    platforms: "PC, PlayStation 4, Xbox One, Nintendo Switch",
    developer: "Maddy Makes Games",
    releaseYear: 2018,
    rating: 9.1,
  },
  {
    id: 24,
    title: "It Takes Two",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=It+Takes+Two",
    description:
      "A genre-bending co-op adventure where a feuding couple must work together to save their relationship. Embark on the craziest journey of your lives through fantastical game mechanics.",
    genres: "Co-op, Action, Adventure, Platformer",
    platforms: "PC, PlayStation 5, PlayStation 4, Xbox Series X|S, Xbox One, Nintendo Switch",
    developer: "Hazelight Studios",
    releaseYear: 2021,
    rating: 9.1,
  },
  {
    id: 25,
    title: "Animal Crossing: New Horizons",
    coverUrl: "https://placehold.co/600x800/1a1a2e/8B5CF6?text=Animal+Crossing",
    description:
      "Escape to a deserted island and create your own paradise. Explore, create, and customize your island as you build your community from scratch in this relaxing life simulation.",
    genres: "Simulation, Social",
    platforms: "Nintendo Switch",
    developer: "Nintendo EPD",
    releaseYear: 2020,
    rating: 8.9,
  },
];
