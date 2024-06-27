const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const inTwoDays = new Date();
inTwoDays.setDate(tomorrow.getDate() + 1);

export const mockSwimSeason =
    {
        "id": "testSeason",
        "author": "RemiB123",
        "title": "Summer 2024",
        "active": true,
        "favorite": true,
        "notes": "Test swim season object",
        "rating": 4.0,
        "body": [
            {
                "datetime": today,
                "planned": "cdef",
                "completed": "cdef",
                "comments": "Good set of goal 50s"
            },
            {
                "datetime": tomorrow,
                "planned": "defg",
                "completed": "efgh",
                "comments": "Completely changed the plan today"
            },
            {
                "datetime": inTwoDays,
                "planned": "efgh",
                "completed": null,
                "comments": "To be replaced by TBD"
            }
        ]
    }