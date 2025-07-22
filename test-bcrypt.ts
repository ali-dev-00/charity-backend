import * as bcrypt from 'bcryptjs';

async function testBcrypt() {
  const password = 'password123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Generated hash:', hash);
  const isMatch = await bcrypt.compare(password, hash);
  console.log('Password matches:', isMatch); 
  const isMatchWithStored = await bcrypt.compare(
    password,
    '$2b$10$QSL21upECurFzne.05xLKOpul14nYj7uBkEffvulw.bMa236QAIvC',
  );
  console.log('Matches stored hash:', isMatchWithStored); // Should print true if correct
}

testBcrypt().catch(console.error);