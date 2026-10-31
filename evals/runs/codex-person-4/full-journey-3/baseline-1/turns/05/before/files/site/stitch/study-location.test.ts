import { test } from "node:test";
import assert from "node:assert/strict";
import { checkPerson, studyLocation } from "./person.ts";
import { SAMPLE_PEOPLE } from "./people.ts";

test("an institution label does not send an explicitly located degree to the current home", () => {
  const person = { ...SAMPLE_PEOPLE.noa,
    places: [
      { name: "Addis Ababa", lat: 9.03, lng: 38.74, what: "study" },
      { name: "Rotterdam", lat: 51.92, lng: 4.48, what: "now" },
    ],
    study: [{ degree: "BSc", field: "Electrical Engineering", place: "Entoto Technical University", city: "Addis Ababa", from: 2009, to: 2013 }],
  };
  assert.equal(studyLocation(person, person.study[0]), person.places[0]);
  assert.deepEqual(checkPerson(person), []);
  const unknown = { ...person, study: [{ ...person.study[0], city: "Unknown" }] };
  assert.equal(studyLocation(unknown, unknown.study[0]), null);
  assert.ok(checkPerson(unknown).some(error => error.includes("Unknown")));
});
