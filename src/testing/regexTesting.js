let content = `
The Atari 2600, branded as the Atari Video Computer System (Atari VCS) until November 1982, is a home video game console developed and produced by Atari, Inc. Released in September 1977, it popularized the use of microprocessor-based hardware and of games stored on swappable ROM cartridges, a format first used with the Fairchild Channel F in 1976. The VCS was bundled with two joystick controllers, a conjoined pair of paddle controllers, and a game cartridge—initially Combat and later Pac-Man.Atari was successful at creating arcade games, but their development cost and limited lifespan drove CEO Nolan Bushnell to seek a programmable home system. The first inexpensive microprocessors from MOS Technologies in late 1975 made this feasible. The console was prototyped as codename Stella, by Atari subsidiary Cyan Engineering. Lacking funding to complete the project, Bushnell sold Atari to Warner Communications in 1976.
The Atari VCS launched in 1977 with nine simple, low-resolution games in 2 KB cartridges. The system's first killer app is the home conversion of Taito's arcade game Space Invaders in 1980. The VCS became widely successful, leading to the founding of Activision and other third-party game developers, and to competition from home console manufacturers Mattel and Coleco. By the end of its primary lifecycle in 1983–84, games for the 2600 were using more than four times the storage size of the launch games with significantly more advanced visuals and gameplay than the system was designed for, such as Activision's Pitfall!.
In 1982, the Atari 2600 was the dominant game system. Amid competition from both new consoles and game developers, a number of poor decisions from Atari management affected the company and the industry as a whole. The most public was an extreme investment into licensed games for the 2600, including Pac-Man and E.T. the Extra-Terrestrial. Pac-Man became the system's biggest selling game, but its poor quality conversion eroded consumer confidence in the console. E.T. was rushed to market for the holiday shopping season, and thus critically panned and a commercial failure. Both games, and a glut of third-party shovelware, are factors in ending Atari's relevance in the console market. Atari's downfall reverberated through the industry resulting in the video game crash of 1983.
Warner sold Atari's home division to former Commodore CEO Jack Tramiel in 1984. In 1986, the new Atari Corporation under Tramiel released a lower-cost version of the 2600 and the backward-compatible Atari 7800, but it was Nintendo that led the recovery of the industry with its 1985 launch of the Nintendo Entertainment System. Production of the Atari 2600 ended on January 1, 1992, with an estimated 30 million units sold across its lifetime.


== History ==
Atari, Inc. was founded by Nolan Bushnell and Ted Dabney in 1972. The first major product is Pong, released in 1972, the first successful coin-operated video game. While Atari continued to develop new arcade games in following years, Pong gave rise to a number of competitors to the growing arcade game market. The competition along with other missteps by Atari led to financial problems in 1974, though recovering by the end of the year. By 1975, Atari had released a Pong home console, competing against Magnavox, the only other major producer of home consoles at the time. Atari engineers recognized, however, the limitation of custom logic burned onto the circuit board, permanently confining the whole console to only one game. The increasing competition increased the risk, as Atari had found with past arcade games and again with dedicated home consoles. Both platforms are built from integrating discrete electro-mechanical components into circuits, rather than programmed as on a mainframe computer. Therefore, development of a console had cost at least $100,000 (equivalent to about $481,000 in 2020) plus time to complete, but the final product only had about a three-month shelf life until becoming outdated by competition.By 1974, Atari had acquired Cyan Engineering, a Grass Valley electronics company founded by Steve Mayer and Larry Emmons, both former colleagues of Bushnell and Dabney from Ampex, who helped to develop new ideas for Atari's arcade games. Even prior to the release of the home version of Pong, Cyan's engineers, led by Mayer and Ron Milner, had envisioned a home console powered by new programmable microprocessors capable of playing Atari's current arcade offerings. The programmable microprocessors would enable a console design significantly simpler and more powerful than any dedicated single-game unit. However, such chips cost $100–300, far outside the range that their market would support. Atari had opened negotiations to use Motorola's new 6800 in future systems.


=== MOS Technology 6502/6507 ===
In September 1975, MOS Technology debuted the 6502 microprocessor for $25 at the Wescon trade show in San Francisco. Mayer and Milner attended and met with the leader of the team that created the chip, Chuck Peddle, and proposed using the 6502 in a game console, and offered to discuss it further at Cyan's facilities after the show.Over two days, MOS and Cyan engineers sketched out a 6502-based console design by Meyer and Milner's specifications. Financial models showed that even at $25, the 6502 would be too expensive, and Peddle offered them a planned 6507 microprocessor, a cost-reduced version of the 6502, and MOS's RIOT chip for input/output. Cyan and MOS negotiated the 6507 and RIOT chips at $12 a pair. MOS also introduced Cyan to Microcomputer Associates, who had separately developed debugging software and hardware for MOS, and had developed the JOLT Computer for testing the 6502, which Peddle suggested would be useful for Atari and Cyan to use while developing their system. Milner was able to demonstrate a proof-of-concept for a programmable console by implementing Tank, an arcade game by Atari's subsidiary Kee Games, on the JOLT.As part of the deal, Atari wanted a second source of the chipset. Peddle and Paivinen suggested Synertek whose co-founder, Bob Schreiner, was a friend of Peddle. In October 1975, Atari informed the market that it was moving forward with MOS. The Motorola sales team had already told its management that the Atari deal was finalized, and Motorola management was livid. They announced a lawsuit against MOS the next week.

`;

const splitter = () => {
    let splittedContent = content.split(/(=+ (?:\S* )+=+)/g);

    return splittedContent;
}

module.exports = {splitter}