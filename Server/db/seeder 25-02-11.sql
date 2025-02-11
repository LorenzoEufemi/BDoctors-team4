ALTER TABLE reviews DROP CHECK reviews_chk_1;
ALTER TABLE reviews ADD CONSTRAINT reviews_chk_1 CHECK (vote BETWEEN 0 AND 5);