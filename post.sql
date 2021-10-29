CREATE `postProject`;

CREATE TABLE `mypost` (
  `id` int(11)  NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `writer`varchar(100) NOT NULL,
  `hashtag` varchar(200),
  `main_text` varchar(2048) NOT NULL,
  `like_cnt` int(11) default 0,
  `like_state` boolean default 0,
  `time` DATETIME,
  PRIMARY KEY (`id`)
);

-- 한글설정
ALTER TABLE mypost convert to charset utf8;

  INSERT INTO `mypost` (id, title, writer, main_text) VALUES (2,'hello', 'welcome,first', 'soya', '첫 게시글을 축하합니다.');
  INSERT INTO `mypost` VALUES (2,'고래 (Dive Into You)', 'NCT DREAM','dream,diveintoyou,sm', 'Look around 둘러봐도 온통 짙은 푸른빛 까만 밤 마치 깊은 물에 잠수한 듯이 먹먹함 속에 너의 목소리만 뚜렷해 어쩌지');
  INSERT INTO `mypost` VALUES (3,'Next Level', 'aespa', 'ai,sm,mario,광야', 'Im on the Next Level Yeah 절대적 룰을 지켜 내 손을 놓지 말아 결속은 나의 무기 광야로 걸어가 알아 네 Home ground 위협에 맞서서
제껴라 제껴라 제껴라');
  INSERT INTO `mypost` VALUES (4,'낙하 (with 아이유)', '악동뮤지션', '악뮤,아이유,낙하', '말했잖아 언젠가 이런 날이 온다면 난 널 혼자');
  INSERT INTO `mypost` VALUES (5,'Queendom', 'Red Velvet (레드벨벳)', '퀸덤,레벨', 'We are Queens in the red castle Don’t need crown 타고났지 Dazzle 함께 만들어 온 Paradigm 확실히 다른 Stereotype');
  INSERT INTO `mypost` (id, title, writer, main_text)  VALUE (6,'바라만 본다', 'MSG워너비(M.O.M)', '', '내가 너라면 다 알아볼 텐데');
  INSERT INTO `mypost` VALUES (7,'Bad Habits', 'Ed Sheeran', '시런', 'My bad habits lead to late nights ending alone Conversations with a stranger I barely know Swearing this will be the last');

-- USER INFO

CREATE TABLE `user` (
  `userId` varchar(20) NOT NULL,
  `userPassword` varchar(50) NOT NULL,
  PRIMARY KEY(`userId`)
);


-- '좋아요' DB 
CREATE TABLE `like` (
  `userId` varchar(20) NOT NULL,
  `id` int(11) NOT NULL,
  `like_cnt` int(11) NOT NULL,
  PRIMARY KEY(`userId`)
);

ALTER TABLE comment convert to charset utf8;

-- 댓글
-- 정렬 //// 해당 포스트의 시간 순으로
CREATE TABLE `comment` (
  `userId` varchar(20) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postUserId` varchar(20) NOT NULL,
  `postId` varchar(20) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY(`id`)
);