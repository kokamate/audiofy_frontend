-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Ápr 16. 08:22
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `audiofy`
--
CREATE DATABASE IF NOT EXISTS `audiofy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `audiofy`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `liked songs`
--

CREATE TABLE `liked songs` (
  `userID` int(10) UNSIGNED NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `liked songs`
--

INSERT INTO `liked songs` (`userID`, `songID`) VALUES
(2, 48),
(2, 46),
(2, 49),
(2, 45),
(2, 47),
(4, 48),
(4, 49),
(4, 52),
(4, 45),
(4, 50),
(4, 47),
(5, 48),
(5, 47),
(5, 46),
(5, 52),
(2, 56),
(4, 54);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `music`
--

CREATE TABLE `music` (
  `songID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `musicImg` varchar(255) DEFAULT NULL,
  `title` varchar(70) NOT NULL,
  `song` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `music`
--

INSERT INTO `music` (`songID`, `userID`, `name`, `musicImg`, `title`, `song`) VALUES
(45, 1, 'The Monster (Explicit)', '/uploads/45/eminem ft rihanna.jfif', 'Eminem ft. Rihanna', '/uploads/45/Eminem ft. Rihanna - The Monster (Explicit) [Official Video].mp3'),
(46, 1, 'Forró Zsé', '/uploads/46/forro zse.jfif', 'Fiatal Veterán', '/uploads/46/Fiatal VeterÃ¡n - ForrÃ³ ZsÃ©.mp3'),
(47, 1, 'HA GAZDAG LENNÉK', '/uploads/47/ha gazdag lennek.jfif', 'GRASA', '/uploads/47/GRASA - HA GAZDAG LENNÃK (OFFICIAL VISUALIZER).mp3'),
(48, 1, 'Firework', '/uploads/48/firework.jfif', 'Katy Perry', '/uploads/48/Katy Perry - Firework (Official Music Video).mp3'),
(49, 1, 'Hot N Cold', '/uploads/49/hot n cold.jfif', 'Katy Perry', '/uploads/49/Katy Perry - Hot N Cold (Official Music Video).mp3'),
(50, 1, 'I Kissed A Girl', '/uploads/50/i kissed a girl.jfif', 'Katy Perry', '/uploads/50/Katy Perry - I Kissed A Girl (Official Music Video).mp3'),
(51, 1, 'Last Friday Night (T.G.I.F.)', '/uploads/51/last friday night.jfif', 'Katy Perry', '/uploads/51/Katy Perry - Last Friday Night (T.G.I.F.) (Official Music Video).mp3'),
(52, 1, 'JACUZZI feat. BSW', '/uploads/52/kkevin jacuzzi.jfif', 'KKevin', '/uploads/52/KKevin - JACUZZI feat. BSW (SAVAGE album).mp3'),
(53, 1, 'WAY TOO HIGH feat. RZMVS', '/uploads/53/kkevin way too high.jfif', 'KKevin', '/uploads/53/KKevin - WAY TOO HIGH feat. RZMVS (SAVAGE album).mp3'),
(54, 1, 'Don\'t Stop The Music', '/uploads/54/Rihanna - Don\'t Stop The Music.jfif', 'Rihanna', '/uploads/54/Rihanna - Don\'t Stop The Music.mp3'),
(55, 1, 'S&M', '/uploads/55/Rihanna - S&M.jfif', 'Rihanna', '/uploads/55/Rihanna - S&M.mp3'),
(56, 1, 'xXx', '/uploads/56/T. Danny - xXx (Official Music Video).jfif', 'T. Danny', '/uploads/56/T. Danny - xXx (Official Music Video).mp3'),
(57, 1, 'BRAZIL FÁNK ft. BRUNO, KKEVIN ( OFFICIAL MUSIC VID', '/uploads/57/VALMAR - BRAZIL FÃNK ft. BRUNO, KKEVIN ( OFFICIAL MUSIC VIDEO).jfif', 'VALMAR', '/uploads/57/VALMAR - BRAZIL FÃNK ft. BRUNO, KKEVIN ( OFFICIAL MUSIC VIDEO).mp3'),
(58, 1, 'Libikóka (Official Audio)', '/uploads/58/VINI - LibikÃ³ka (Official Audio).jfif', 'VINI', '/uploads/58/VINI - LibikÃ³ka (Official Audio).mp3'),
(59, 1, 'KISS feat. Sárközi Roland (OFFICIAL VISUALIZER)', '/uploads/59/VZS - KISS feat. SÃ¡rkÃ¶zi Roland (OFFICIAL VISUALIZER).jfif', 'VZS', '/uploads/59/VZS - KISS feat. SÃ¡rkÃ¶zi Roland (OFFICIAL VISUALIZER).mp3'),
(60, 1, 'Trónfosztó', '/uploads/60/VZS - TrÃ³nfosztÃ³.jfif', 'VZS', '/uploads/60/VZS - TrÃ³nfosztÃ³.mp3'),
(61, 1, 'Was ist das', '/uploads/61/rugos beke was ist das.jfif', 'Rugós beke', '/uploads/61/RugÃ³s beke - Was ist das.mp3'),
(62, 1, 'Himnusz', '/uploads/62/rugos beke himnusz.jfif', 'Rugós Beke', '/uploads/62/RugÃ³s Beke - Himnusz (Teljes).mp3'),
(63, 1, 'Lakatos Brendon szabadlábra helyező', '/uploads/63/lakatos brendon gyonatofulke.jfif', 'Lakatos Brendon', '/uploads/63/GyÃ³ntatÃ³fÃ¼lke - Lakatos Brendont szabadlÃ¡bra helyezÅ mix.mp3');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlists`
--

CREATE TABLE `playlists` (
  `playlistID` int(10) UNSIGNED NOT NULL,
  `userID` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `playlists`
--

INSERT INTO `playlists` (`playlistID`, `userID`, `name`) VALUES
(2, 2, 'f,dlfd'),
(1, 2, 'test'),
(4, 4, '.'),
(3, 4, 'l'),
(5, 5, 'TanarBa');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `playlist_songs`
--

CREATE TABLE `playlist_songs` (
  `id` int(10) UNSIGNED NOT NULL,
  `playlistID` int(10) UNSIGNED NOT NULL,
  `songID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `playlist_songs`
--

INSERT INTO `playlist_songs` (`id`, `playlistID`, `songID`) VALUES
(5, 1, 46),
(1, 1, 48),
(3, 1, 51),
(4, 1, 52),
(15, 2, 56),
(11, 3, 47),
(12, 5, 49),
(13, 5, 52),
(14, 5, 53);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `userID` int(10) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `psw` varchar(255) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`userID`, `email`, `psw`, `role`) VALUES
(1, 'Doki@gmail.com', '$2b$10$e2qInkjryclVyTho6aD4j.lhPHhnrp.IjpyY00AGmiGTBS0DQOQ9O', 'admin'),
(2, '1', '$2b$10$TWZY6hNF61GY7dxAXq9AnudAjDgiPVO4gz82veWyS/6F3QGrMooCu', 'admin'),
(3, 'a', '$2b$10$cGOvRdkGHuVGvoiOPEiyw.11sAYD/VW/wWC0L5fVKXS8.qqflGC/W', 'admin'),
(4, 'd', '$2b$10$SPnJw6KL/lwnQF13hQjkz.jilv8Zvpojn3Zij7mAGkwPI7vfGBRBu', 'user'),
(5, 'o', '$2b$10$Z2squxa0InbR3DP7m3KwXOcPVo7wIxAClgr7ueFtWsFlRwNdmxT1G', 'user');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `liked songs`
--
ALTER TABLE `liked songs`
  ADD KEY `liked songs_userid_index` (`userID`),
  ADD KEY `liked songs_songid_index` (`songID`);

--
-- A tábla indexei `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`songID`),
  ADD KEY `music_userid_foreign` (`userID`);

--
-- A tábla indexei `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`playlistID`),
  ADD UNIQUE KEY `playlists_userid_name_unique` (`userID`,`name`),
  ADD KEY `playlists_userid_index` (`userID`);

--
-- A tábla indexei `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `playlist_song_unique` (`playlistID`,`songID`),
  ADD KEY `playlist_songs_playlistid_index` (`playlistID`),
  ADD KEY `playlist_songs_songid_index` (`songID`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `user_email_unique` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `music`
--
ALTER TABLE `music`
  MODIFY `songID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT a táblához `playlists`
--
ALTER TABLE `playlists`
  MODIFY `playlistID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `playlist_songs`
--
ALTER TABLE `playlist_songs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `liked songs`
--
ALTER TABLE `liked songs`
  ADD CONSTRAINT `liked songs_songid_foreign` FOREIGN KEY (`songID`) REFERENCES `music` (`songID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liked songs_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_userid_foreign` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `playlist_songs_playlistid_foreign` FOREIGN KEY (`playlistID`) REFERENCES `playlists` (`playlistID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `playlist_songs_songid_foreign` FOREIGN KEY (`songID`) REFERENCES `music` (`songID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
