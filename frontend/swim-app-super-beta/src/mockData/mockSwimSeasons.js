const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const inTwoDays = new Date();
inTwoDays.setDate(tomorrow.getDate() + 1);

export const mockSwimSeasons = [
    {
        "id": "testSeason",
        "owner": "RemiB123",
        "title": "Summer 2024",
        "active": true,
        "favorite": true,
        "notes": "Test swim season object",
        "rating": 4.0,
        "body": [
            {
                "id": "12345",
                "datetime": today,
                "planned": "cdef",
                "completed": "cdef",
                "comments": "Good set of goal 50s"
            },
            {
                "id": "23456",
                "datetime": tomorrow,
                "planned": "defg",
                "completed": "efgh",
                "comments": "Completely changed the plan today"
            },
            {
                "id": "34567",
                "datetime": inTwoDays,
                "planned": "efgh",
                "completed": null,
                "comments": "To be replaced by TBD"
            }
        ]
    }
]