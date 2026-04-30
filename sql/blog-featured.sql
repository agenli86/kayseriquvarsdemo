-- Blog yazılarına "öne çıkarılmış" alanı ekler
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
