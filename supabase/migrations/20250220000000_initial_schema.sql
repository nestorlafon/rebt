-- REBT Learning Platform - Initial Schema
-- RD 842/2002 Reglamento Electrotécnico para Baja Tensión

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Regulation sections (Artículos, Títulos from REBT)
CREATE TABLE rebt_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES rebt_sections(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  section_type TEXT NOT NULL CHECK (section_type IN ('titulo', 'articulo', 'anexo')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_rebt_sections_parent ON rebt_sections(parent_id);
CREATE INDEX idx_rebt_sections_order ON rebt_sections("order");

-- ITC-BT (Instrucciones Técnicas Complementarias)
CREATE TABLE rebt_itc (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT,
  summary TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_rebt_itc_order ON rebt_itc("order");

-- Quiz questions for practice
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES rebt_sections(id) ON DELETE SET NULL,
  itc_id UUID REFERENCES rebt_itc(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- ["option1", "option2", ...]
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0),
  explanation TEXT,
  difficulty TEXT CHECK (difficulty IN ('facil', 'medio', 'dificil')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quiz_questions_section ON quiz_questions(section_id);
CREATE INDEX idx_quiz_questions_itc ON quiz_questions(itc_id);

-- User progress (works with Supabase Auth)
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section_id UUID REFERENCES rebt_sections(id) ON DELETE CASCADE,
  itc_id UUID REFERENCES rebt_itc(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT progress_has_target CHECK (
    (section_id IS NOT NULL AND itc_id IS NULL) OR
    (section_id IS NULL AND itc_id IS NOT NULL)
  )
);

CREATE UNIQUE INDEX idx_user_section_progress ON user_progress(user_id, section_id) WHERE section_id IS NOT NULL;
CREATE UNIQUE INDEX idx_user_itc_progress ON user_progress(user_id, itc_id) WHERE itc_id IS NOT NULL;
CREATE INDEX idx_user_progress_user ON user_progress(user_id);

-- Quiz attempts and scores
CREATE TABLE user_quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_user_quiz_attempts_user ON user_quiz_attempts(user_id);

-- RLS Policies
ALTER TABLE rebt_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE rebt_itc ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Public read for content
CREATE POLICY "rebt_sections_read" ON rebt_sections FOR SELECT USING (true);
CREATE POLICY "rebt_itc_read" ON rebt_itc FOR SELECT USING (true);
CREATE POLICY "quiz_questions_read" ON quiz_questions FOR SELECT USING (true);

-- User-specific policies for progress
CREATE POLICY "user_progress_select" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_progress_insert" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_progress_delete" ON user_progress FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "user_quiz_select" ON user_quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_quiz_insert" ON user_quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
