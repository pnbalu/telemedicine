from dotenv import load_dotenv
from livekit import agents
from livekit.agents import AgentSession, Agent, RoomInputOptions
from livekit.plugins import google, noise_cancellation
from instructions import ASSISTANT_INSTRUCTIONS, REALTIME_INSTRUCTIONS

load_dotenv()


# --------------------------------------------------------------------
#  Define the Medical Assistant Agent
# --------------------------------------------------------------------
class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(instructions=ASSISTANT_INSTRUCTIONS)


# --------------------------------------------------------------------
#  Entrypoint for the agent
# --------------------------------------------------------------------
async def entrypoint(ctx: agents.JobContext):
    print(f"\n{'='*70}")
    print(f"🤖  Agent Name: Medical AI Assistant")
    print(f"🏠  Connected Room: {ctx.room.name}")
    print(f"{'='*70}\n")

    session = AgentSession(
        llm=google.beta.realtime.RealtimeModel(
            model="gemini-2.0-flash-exp",
            voice="Puck",
            temperature=0.8,
            instructions=REALTIME_INSTRUCTIONS,
        ),
    )

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    print(f"✅  Session started successfully in room: {ctx.room.name}\n")

    await session.generate_reply(
        instructions="Greet the patient warmly and ask what brings them here today."
    )

    print("🗣️  Greeting sent to patient!\n")


# --------------------------------------------------------------------
#  Worker Startup
# --------------------------------------------------------------------
if __name__ == "__main__":
    agent_name = "medical-assistant"

    print("\n🚀  Starting Medical AI Agent (Google Gemini Realtime)")
    print(f"🤖  Agent Name: {agent_name}")
    print("======================================================\n")

    agents.cli.run_app(
        agents.WorkerOptions(
            entrypoint_fnc=entrypoint,
            agent_name=agent_name,
        )
    )

