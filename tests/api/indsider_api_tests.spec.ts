import { test, expect } from "@playwright/test";
import axios from "axios";

const BASE_URL = "https://petstore.swagger.io/v2";
const PET_ENDPOINT = `${BASE_URL}/pet`;

function uniquePet() {
  return {
    id: Date.now(),
    name: `Fluffy-${Date.now()}`,
    status: "available"
  };
}

//
// POSITIVE CRUD
//
test("Pet CRUD Positive", async () => {
  // CREATE
  const pet = uniquePet();

  let res = await axios.post(PET_ENDPOINT, pet);
  expect(res.status).toBe(200);

  const createdId = res.data.id;
  expect(createdId).toBeTruthy();

  // READ
  res = await axios.get(`${PET_ENDPOINT}/${createdId}`);
  expect(res.status).toBe(200);
  expect(res.data.name).toBe(pet.name);

  // UPDATE
  const updatedPet = { ...pet, status: "sold" };
  res = await axios.put(PET_ENDPOINT, updatedPet);
  expect(res.status).toBe(200);
  expect(res.data.status).toBe("sold");

  // DELETE
  res = await axios.delete(`${PET_ENDPOINT}/${createdId}`);
  expect([200, 204]).toContain(res.status);

  // VERIFY DELETE
  await expect(async () => {
    await axios.get(`${PET_ENDPOINT}/${createdId}`);
  }).rejects.toThrow();
});

//
// NEGATIVE CRUD
//
test("GET non-existing pet returns 404", async () => {
  const invalidId = 999999999999;

  await expect(async () => {
    await axios.get(`${PET_ENDPOINT}/${invalidId}`);
  }).rejects.toThrow();
});

test("DELETE non-existing pet returns 404", async () => {
  const invalidId = 999999999999;

  await expect(async () => {
    await axios.delete(`${PET_ENDPOINT}/${invalidId}`);
  }).rejects.toThrow();
});

test("DELETE same pet twice: second delete should fail", async () => {
  const pet = uniquePet();

  let res = await axios.post(PET_ENDPOINT, pet);
  expect(res.status).toBe(200);

  const createdId = res.data.id;

  // First delete succeeds
  res = await axios.delete(`${PET_ENDPOINT}/${createdId}`);
  expect([200, 204]).toContain(res.status);

  // Second delete fails
  await expect(async () => {
    await axios.delete(`${PET_ENDPOINT}/${createdId}`);
  }).rejects.toThrow();
});
